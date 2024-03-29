<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('stores')->upsert([
            ['label' => 'Cebu'],
            ['label' => 'Davao'],
            ['label' => 'Tagum'],
        ],  ['label'], ['created_at', 'updated_at']);
    }
}
