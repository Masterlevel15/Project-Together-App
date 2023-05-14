<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Geocoder\Geocoder;

class GeocoderServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(Geocoder::class, function () {
            return new Geocoder(new CustomNominatim('your_user_agent'));
        });
    }
}
