<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Region;
use Illuminate\Support\Facades\File;

class RegionSeeder extends Seeder
{
    public function run()
    {
        $regions = json_decode(File::get(database_path('region.json')), true);

        foreach ($regions as $region) {
            Region::create([
                'name' => $region['region_name'],
                'code' => $region['region_code']
            ]);
        }
    }
}
