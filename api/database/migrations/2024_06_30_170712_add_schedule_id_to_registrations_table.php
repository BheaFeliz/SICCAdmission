<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('registrations', function (Blueprint $table) {
            // Adding the column first
            $table->unsignedBigInteger('schedule_id')->nullable()->after('id');
            // Setting the column as a foreign key
            $table->foreign('schedule_id')->references('id')->on('schedules')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('registrations', function (Blueprint $table) {
            // Dropping the foreign key constraint first
            $table->dropForeign(['schedule_id']);
            // Dropping the column afterwards
            $table->dropColumn('schedule_id');
        });
    }
};
