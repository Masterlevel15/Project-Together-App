<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bookmark;

class BookmarkController extends Controller
{
    //
    public function showBookmark($user, $activity) {
        $bookmark = Bookmark::where('user_id', (int)$user)->where('activity_id', (int)$activity)->get();
        
        return response()->json($bookmark);
    }
    public function store(Request $request) {

        $user = Bookmark::where('user_id', $request->input('user_id'))->get();

        $activity = Bookmark::where('activity_id', $request->input('activity_id'))->get();
        
        if(count($user) > 0 && count($activity) > 0) {
            Bookmark::where('user_id', $request->input('user_id'))->where('activity_id', $request->input('activity_id'))->update(['active' => $request->input('bookmark')]);

            $isBookmark = $request->input('bookmark');
        }
        else{
            $bookmark = new Bookmark();
            $bookmark->user_id = $request->input('user_id');
            $bookmark->activity_id = $request->input('activity_id');
            $bookmark->active = $request->input('bookmark');

            $bookmark->save();
            $isBookmark = $request->input('bookmark');
        }

        return response()->json(['message' => 'Activité ajouté au favoris', 'bookMarkState' => $isBookmark], 201);
    }
}
