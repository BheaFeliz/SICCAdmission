<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            AdminSeeder::class,
            RegionSeeder::class,
            ProvinceSeeder::class,
            CitySeeder::class,
            BarangaySeeder::class,
        ]);
    }
}
