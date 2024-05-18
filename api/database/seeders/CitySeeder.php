<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\City;

class CitySeeder extends Seeder
{
    public function run()
    {
        $cities = json_decode(File::get(database_path('city.json')), true);

        foreach ($cities as $city) {
            City::create([
                'name' => $city['city_name'],
                'code' => $city['city_code'],
                'region_code' => $city['region_desc'],
                'province_code' => $city['province_code']
            ]);
        }
    }
}
