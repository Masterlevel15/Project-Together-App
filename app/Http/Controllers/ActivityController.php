<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Geocoder\Query\GeocodeQuery;
use Geocoder\Query\ReverseQuery;
use Geocoder\Provider\Nominatim\Nominatim;
use Geocoder\Exception\NoResultException;
use GuzzleHttp\Client as GuzzleClient;
use App\Providers\CustomNominatim;
use App\Models\Activity;
use App\Models\City;
use App\Models\Country;
use App\Models\User;
use App\Models\UserActivity;
use App\Models\Bookmark;
use Inertia\Inertia;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Redirect;
use App\Pinia\ActivitiesStore;
use Illuminate\Support\Facades\Storage;

class ActivityController extends Controller
{
    //
    private $distance,  $sortedActivities, $activities, $countryIndex;

    private function radians(float $degrees): float
    {   
    return $degrees * pi() / 180;
    }
    private function openStreetMapAPI() {
        $httpClient = new GuzzleClient();
        $userAgent = 'together-app-jetstream';

        $nominatim = new Nominatim($httpClient, 'https://nominatim.openstreetmap.org', $userAgent);
        
        return $nominatim;
    }
    private function distanceBetweenCoordinates(Array $coords1, Array $coords2) {
        $this->distance = ACOS(SIN(self::radians($coords1['latitude']))*SIN(self::radians($coords2['latitude']))+COS(self::radians($coords1['latitude']))*COS(self::radians($coords2['latitude']))*COS(self::radians($coords1['longitude'] - $coords2['longitude'])))*6371;
        return $this->distance;
    }
    public function show($id)
    {
        $distance = request()->query('distance');
        $activityUsers = User::select("*")
        ->join("users_has_activities", "users_has_activities.user_id", "=", "users.id")
        ->where("users_has_activities.activity_id", "=", $id)->get();
        if($activityUsers !== []){
            $activity = Activity::select("*", "activities.id as activityID", "activities.title as activityTitle","users.name as userName", "activities.id as activityID", "users.id as userID", "users.rate as userRate", "cities.name as cityName", "users.city_id as userCityID", "activities.city_id as activityCityID", "activities.country_id as activityCountryID", "users.country_id as userCountryID", "countries.name as activityCountryName", "categories.name as activityCategoryName", "categories.id as activityCategoryID", "users_has_activities.user_id as activityUserId")
            ->join("users", "activities.promoter_id", "=", "users.id")
            ->join("cities", "activities.city_id", "=", "cities.id")
            ->join("countries", "countries.id", "=", "activities.country_id")->join("categories", "categories.id", "=", "activities.category_id")
            ->join("users_has_activities", "users_has_activities.activity_id", "=", "activities.id")
            ->where("activities.id", $id)
            ->get();
        }
        $activityUsers = [];
        $activity = Activity::select("*", "activities.id as activityID", "activities.title as activityTitle","users.name as userName", "activities.id as activityID", "users.id as userID", "users.rate as userRate", "cities.name as cityName", "users.city_id as userCityID", "activities.city_id as activityCityID", "activities.country_id as activityCountryID", "users.country_id as userCountryID", "countries.name as activityCountryName", "categories.name as activityCategoryName", "categories.id as activityCategoryID")
        ->join("users", "activities.promoter_id", "=", "users.id")
        ->join("cities", "activities.city_id", "=", "cities.id")
        ->join("countries", "countries.id", "=", "activities.country_id")->join("categories", "categories.id", "=", "activities.category_id")
        ->where("activities.id", $id)
        ->get();
        return Inertia::render('Activity/ActivityDetails', [
        'activity' => $activity, 'distance' => $distance,
        'activityUsers' => $activityUsers
        ]);
    }

    public function findActivitiesByCategory(int $id) {
        $activitiesByCategory = Activity::with('promoter', 'category', 'country', 'city', 'users')->where('category_id', $id)->get();

        $latitude = request()->query('coords')['latitude'];
        $longitude = request()->query('coords')['longitude'];
        
        $activitiesWithDistance = [];
        foreach($activitiesByCategory as $activity) {
            $latitudeFromDB =  $activity->latitude;
            $longitudeFromDB =  $activity->longitude;
            
           
            self::distanceBetweenCoordinates(['latitude' => $latitude, 'longitude' => $longitude], ['latitude' => $latitudeFromDB,'longitude' => $longitudeFromDB]);   
            $activity['distance'] = $this->distance;
            array_push($activitiesWithDistance, $activity);
        }

        return Inertia::render('Activity/ActivityBySetting', ['activitiesBySetting'=> $activitiesWithDistance, 'title' => 'catégorie']);
    }
    public function sortActivitiesWithDistances(Request $request) {
        $latitude = $request->input('latitude');
        $longitude = $request->input('longitude');
        if($request->input('distance') !== null && (int)$request->input('distance') !== 0){
            $distance = (int)$request->input('distance');
        }else{
            $distance = 200;
        }
        // $activities = Activity::all()->toArray();
        $this->activities = Activity::with('promoter', 'category', 'country', 'city', 'users')
        ->get();

        $activitiesSortByRange = [];
        foreach($this->activities as $activity) {
            $latitudeFromDB =  $activity['latitude'];
            $longitudeFromDB =  $activity['longitude'];

            self::distanceBetweenCoordinates(['latitude' => $latitude, 'longitude' => $longitude], ['latitude' => $latitudeFromDB,'longitude' => $longitudeFromDB]);

            $activity['distance'] = $this->distance;
            if($activity['distance'] < $distance) {
                array_push($activitiesSortByRange, $activity);
            }
        }

        // ActivitiesStore::setActivities($this->activities);

        $this->sortedActivities = collect($activitiesSortByRange)->sortBy('distance')->toArray();
        
        if($request->input('distance') !== null){
            $activitiesByFilter = []; 
            $sortedActivities = collect($activitiesSortByRange)->sortBy('distance')->toArray();
            foreach($sortedActivities as $sortedActivity){
                array_push($activitiesByFilter, $sortedActivity);
            }
            return $activitiesByFilter;
        }else{
            return response()->json(['activitiesSortByDistance' => $this->sortedActivities, 'activities' =>  $this->activities]);
        }
         
    }

    public function getActivities() {
        $activities = $this->activities;
        return response()->json(['activities' => $this->activities]);
    }

    public function updateAddress()
    {
        /*
        $httpClient = new GuzzleClient();
        $userAgent = 'together-app-jetstream';

        $activities = Activity::all();
        $nominatim = new Nominatim($httpClient, 'https://nominatim.openstreetmap.org', $userAgent);


        foreach ($activities as $activity) {
            // Générer une adresse belge aléatoire
            $faker = \Faker\Factory::create('fr_BE');
            $streetAddress = $faker->streetAddress();
            $postcode = $faker->postcode();
            $city = $faker->city();
            $country = 'Belgium';
            $array = explode(' ', $streetAddress);
            $streetNumber = $array[count($array) - 1];
            $street = array_slice($array, 0, count($array) - 1);
            $streetName = implode(' ',$street);

            $fullStreetAdress = $streetNumber .' '. $streetName;
            $address= $fullStreetAdress . ', ' . $faker->postcode() . ' ' . $faker->city() . ', Belgium';

            //___________________________
            
            $result = $nominatim->geocodeQuery(GeocodeQuery::create($fullStreetAdress));

            if ($result->count() > 0) {
                $latitude = $result->first()->getCoordinates()->getLatitude();
                $longitude = $result->first()->getCoordinates()->getLongitude();
                $streetName = $result->first()->getStreetName();
                $streetNumber = $result->first()->getStreetNumber();
                $cityName = $result->first()->getLocality();
                $zipCode = $result->first()->getPostalCode();
                $countryName = $result->first()->getCountry()->getName();

                $address = $streetName .' '. $streetNumber;

                $city = City::where('name', $cityName)->first();
                if ($city) {
                    $activity->city_id = $city->id;
                    $city->postal_code = $zipCode;
                } else {
                    $city = new City();
                    $city->name = $cityName;
                    $city->postal_code = $zipCode;
                    $city->save();
                    $activity->city_id = $city->id;
                }

                if($countryName === "België / Belgique / Belgien"){
                    $countryName = "Belgique";
                }

                $country = Country::where('name', $countryName)->first();
                if ($country) {
                    $activity->country_id = $country->id;
                } else {
                    $country = new Country();
                    $country->name = $countryName;
                    $country->save();
                    $activity->country_id = $country->id;
                    $city->save();
                }

                //zip code
                // $city->postal_code = $zipCode;

                $activity->latitude = $latitude;
                $activity->longitude = $longitude;

                $activity->save();
                echo "Latitude : $latitude, Longitude : $longitude";
            } else {
                echo "L'adresse n'a pas été trouvée";
            }
        }
        */
    }
    public function store(Request $request) {
        ini_set('display_errors', 1);
        error_reporting(E_ALL);
        // dd($request->file('file')->getClientOriginalExtension());
        
        //INSERT DATABASE
        $userId = User::select('id')->inRandomOrder()->first()->id;
        $activity = new Activity;
 
        $activity->title = $request->input('title');
        $activity->date = $request->input('date');
        $activity->term = $request->input('term');
        $activity->participants_number = $request->input('participants_number');
        $activity->address = $request->input('address');
        $activity->description = $request->input('description');
        $activity->category_id = $request->input('categoryID');
        $activity->distance = 0;
        $activity->user_id = $userId;
        $activity->promoter_id = $userId;
        $activity->created_at = now();
        $activity->updated_at = now();

        // Find Country ID
        $countryName = $request->input('country');
        $country = Country::where('name', $countryName)->first();

        if ($country) {
            $activity->country_id = $country->id;
        } else {
            $country = new Country();
            $country->name = $countryName;
            $country->save();
            $activity->country_id = $country->id;
        }

        // Find City ID
        $cityName = $request->input('city');
        $city = City::where('name', $cityName)->first();

        if ($city) {
            $activity->city_id = $city->id;
        } else {
            $city = new City();
            $city->name = $cityName;
            $city->save();
            $activity->city_id = $city->id;
        }

        // Trouver la latitude et la longitude 
        $httpClient = new GuzzleClient();
        $userAgent = 'together-app-jetstream';

        $nominatim = new Nominatim($httpClient, 'https://nominatim.openstreetmap.org', $userAgent);

        $array = explode(' ', $request->input('address'));
        $streetNumber = $array[count($array) - 1];
        $street = array_slice($array, 0, count($array) - 1);
        $streetName = implode(' ',$street);

        $fullStreetAdress = $streetNumber .' '. $streetName .', '. $request->input('city') .', '. $request->input('country');
        // $fullStreetAdress = "place Cornelis 4, Namur, Belgium";

            //___________________________
            
        $result = $nominatim->geocodeQuery(GeocodeQuery::create($fullStreetAdress));
        if ($result->count() > 0) {
            $latitude = $result->first()->getCoordinates()->getLatitude();
            $longitude = $result->first()->getCoordinates()->getLongitude();
            $activity->latitude = $latitude;
            $activity->longitude = $longitude;
        }
        

        // Upload de l'image
        if($request->file('file') !== null) {
            $imageName = time().".".$request->file('file')->getClientOriginalExtension();

            //Stockage fichier Hébergement (public_html)
            $parentDirectory = realpath(dirname(__DIR__) . '/../../..');
            $filePath = $parentDirectory . '/public_html/assets/images';

            $request->file('file')->move($filePath, $imageName);

            //Stockage local
            $request->file('file')->move(public_path('').'/assets/images', $imageName);
            
            $activity->image =  $imageName;
        }
        // Asscocier des users à l'activité créée
        $userActivity = new UserActivity;
        $usersTableLength = User::count();
        $usersID = User::select("id")->get()->toArray();
        $longueur = mt_rand(1, $usersTableLength);
        $usersIDArray = [];
        foreach($usersID as $userID) {
            array_push($usersIDArray,  $userID['id']);
        }

        for($i = 0; $i < $longueur; $i++) {
            $userID = mt_rand(1, $usersTableLength - 1);
            $userActivity->user_id = $usersIDArray[$userID];
        }
        
        $activity->save();
        $userActivity->activity_id = $activity->id;
        $userActivity->save();

        return response()->json([
            'redirect' => route('home')
        ]);
    }
    public function searchActivities($locality, $distance = 100){
        $nominatim = self::openStreetMapAPI();
        $result = $nominatim->geocodeQuery(GeocodeQuery::create($locality));
        if ($result->count() > 0) {
            $latitude = $result->first()->getCoordinates()->getLatitude();
            $longitude = $result->first()->getCoordinates()->getLongitude();
        }
        $activities = Activity::with('promoter', 'category', 'country', 'city', 'users')
        ->get();

        $activitiesSortByRange = [];
        foreach($activities as $activity) {
            $latitudeFromDB = $activity->latitude;
            $longitudeFromDB = $activity->longitude;

            self::distanceBetweenCoordinates(['latitude' => $latitude, 'longitude' => $longitude], ['latitude' => $latitudeFromDB,'longitude' => $longitudeFromDB]);
            
            $activity['distance'] = $this->distance;

            if($activity['distance'] < $distance) {
                array_push($activitiesSortByRange, $activity);
                
            }
        }
        $activitiesBySearch = []; 
        $sortedActivities = collect($activitiesSortByRange)->sortBy('distance')->toArray();
        foreach($sortedActivities as $sortedActivity){
            array_push($activitiesBySearch, $sortedActivity);
        }
        return $activitiesBySearch; 
    }
    public function searchActivitiesByFilter(Request $request) {
        // return $this->sortActivitiesWithDistances($request);
        $locality = $request->locality; 
        $distance = (int)$request->distance;
        $sortingSettings = $request->sortingSettings;
        $categories = $request->categories;
        $result = null;
        // Envoi de la réponse $categories sous forme de tableau
        $categoriesExplode = explode(',', $categories);
        $categoriesName = [];
        foreach($categoriesExplode as $category){
            array_push($categoriesName, $category);
        }
        // Dans le cas où une ou plusieurs catégories ont été sélectionnées si le $distance a été modifié il sera pris en compte sinon ce sera la a valeur par défaut.
        if($categories !== null && $locality !== null){
            $activitiesByLocality;
            if($distance === 0){
                $activitiesByLocality = $this->searchActivities($locality, $distance = 100);
            }
            else{
                $activitiesByLocality = $this->searchActivities($locality, $distance);
            }
            $activitiesFilterByCategory = [];
            $activities = $activitiesByLocality;
            foreach($activities as $activity) {
                if(in_array($activity['category']['name'], $categoriesName)){
                    array_push($activitiesFilterByCategory, $activity);
                }
            }
            $result = $activitiesFilterByCategory;
        }
        else if($categories !== null){
            $activitiesFilterByCategory = [];
            $activities = $this->sortActivitiesWithDistances($request);
            foreach($activities as $activity) {
                if(in_array($activity['category']['name'], $categoriesName)){
                    array_push($activitiesFilterByCategory, $activity);
                }
            }
            $result = $activitiesFilterByCategory;
        }else if($locality !== null){
            if($distance === 0){
                $activitiesFilterByLocality = $this->searchActivities($locality, $distance = 100);
            }
            else{   
                $activitiesFilterByLocality = $this->searchActivities($locality, $distance);
            }
            $result = $activitiesFilterByLocality;
        }else if($distance > 0 && $locality === null && $categories === null){
            $result = $this->sortActivitiesWithDistances($request);
        }
        else{
            return true;        
        }
        return $result;
    }
    public function findActivitiesBookmarkByUser() {
        $user_id = (int)request()->query('id');
        $latitude = request()->query('coords')['latitude'];
        $longitude = request()->query('coords')['longitude'];
        
        $bookmarks_id = Bookmark::where('user_id', $user_id)->where('active', true)->pluck('activity_id');

        $activities = [];
        foreach($bookmarks_id as $bookmark_id){
            
            $activity = Activity::where('id', $bookmark_id)->with('promoter', 'category', 'country', 'city', 'users')->get();
            array_push($activities, $activity);
        }
        $activities = $activities[0]->toArray();
        $activitiesWithDistance = [];
        foreach($activities as $activity) {
            $latitudeFromDB =  $activity['latitude'];
            $longitudeFromDB =  $activity['longitude'];
           
            self::distanceBetweenCoordinates(['latitude' => $latitude, 'longitude' => $longitude], ['latitude' => $latitudeFromDB,'longitude' => $longitudeFromDB]);   
            $activity['distance'] = $this->distance;
            array_push($activitiesWithDistance, $activity);
        }


        return Inertia::render('Activity/ActivityBySetting', ['activitiesBySetting'=> $activitiesWithDistance, 'title' => 'bookmark']);
        //return $activitiesWithDistance; 
    }
}
