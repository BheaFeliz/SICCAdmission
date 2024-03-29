<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->upsert([
            ['id' => 1, 'label' => 'Charger'],
            ['id' => 2, 'label' => 'Battery'],
            ['id' => 3, 'label' => 'Keyboard'],
            ['id' => 4, 'label' => 'Motherboard'],
            ['id' => 5, 'label' => 'Flex'],
            ['id' => 6, 'label' => 'LCD'],
            ['id' => 7, 'label' => 'Case'],
            ['id' => 8, 'label' => 'Speaker'],
            ['id' => 9, 'label' => 'Fan'],
        ], ['label'], ['created_at', 'updated_at']);
    }
}
