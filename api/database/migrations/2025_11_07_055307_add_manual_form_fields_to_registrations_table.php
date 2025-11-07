<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('registrations', function (Blueprint $table) {
            $table->string('semester')->nullable()->after('courseId');
            $table->string('academic_year_start')->nullable()->after('semester');
            $table->string('academic_year_end')->nullable()->after('academic_year_start');
            $table->date('application_date')->nullable()->after('academic_year_end');
            $table->date('birthdate')->nullable()->after('year');
            $table->string('home_address')->nullable()->after('pbs');
            $table->string('present_address')->nullable()->after('home_address');
            $table->boolean('pwd')->nullable()->after('present_address');
            $table->string('year_graduated')->nullable()->after('pwd');
            $table->string('senior_high_track')->nullable()->after('year_graduated');
            $table->string('strand')->nullable()->after('senior_high_track');
            $table->string('lrn')->nullable()->after('strand');
            $table->string('gpa')->nullable()->after('lrn');
            $table->string('father_name')->nullable()->after('supstudy');
            $table->string('mother_maiden_name')->nullable()->after('father_name');
            $table->json('family_members')->nullable()->after('mother_maiden_name');
            $table->boolean('dswd_member')->nullable()->after('family_members');
            $table->string('dswd_member_details')->nullable()->after('dswd_member');
            $table->boolean('social_assistance_beneficiary')->nullable()->after('dswd_member_details');
            $table->string('social_assistance_details')->nullable()->after('social_assistance_beneficiary');
            $table->string('total_monthly_income')->nullable()->after('social_assistance_details');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('registrations', function (Blueprint $table) {
            $table->dropColumn([
                'semester',
                'academic_year_start',
                'academic_year_end',
                'application_date',
                'birthdate',
                'home_address',
                'present_address',
                'pwd',
                'year_graduated',
                'senior_high_track',
                'strand',
                'lrn',
                'gpa',
                'father_name',
                'mother_maiden_name',
                'family_members',
                'dswd_member',
                'dswd_member_details',
                'social_assistance_beneficiary',
                'social_assistance_details',
                'total_monthly_income',
            ]);
        });
    }
};
