<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Province;
use Illuminate\Support\Facades\File;

class ProvinceSeeder extends Seeder
{
    public function run()
    {
        $provinces = json_decode(File::get(database_path('province.json')), true);

        foreach ($provinces as $province) {
            Province::create([
                'name' => $province['province_name'],
                'code' => $province['province_code'],
                'region_code' => $province['region_code']
            ]);
        }
    }
}
