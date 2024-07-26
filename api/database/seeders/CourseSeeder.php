<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;


class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('courses')->upsert([
            ['id' => 1, 'value' => 'BSAB', 'label' =>  'BS Agri Business'],
            ['id' => 2, 'value' => 'BSE', 'label' =>  'BS Entrepreneurship'],
            ['id' => 3, 'value' => 'BPA', 'label' =>  'Bachelor of Public Administration'],
            ['id' => 4, 'value' => 'BST', 'label' =>  'BS Tourism'],
            ['id' => 5, 'value' => 'BSC', 'label' => 'BS Criminology'],
        ], ['value'], ['label'], ['created_at', 'updated_at']);
    }
}
