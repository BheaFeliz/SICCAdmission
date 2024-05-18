<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Barangay;
use Illuminate\Support\Facades\File;

class BarangaySeeder extends Seeder
{
    public function run()
    {
        $barangays = json_decode(File::get(database_path('barangay.json')), true);

        foreach ($barangays as $barangay) {
            Barangay::create([
                'name' => $barangay['brgy_name'],
                'code' => $barangay['brgy_code'],
                'region_code' => $barangay['region_code'],
                'province_code' => $barangay['province_code'],
                'city_code' => $barangay['city_code']
            ]);
        }
    }
}
