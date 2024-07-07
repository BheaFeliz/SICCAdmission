<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSchedulesTable extends Migration
{
    public function up()
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            //add Room name here
            $table->date('date');
            $table->string('startTime');
            $table->string('endTime');
            $table->string('description')->nullable();
            $table->timestamps();
        });
    }
//Migrate na lng dri ang name instead na i Modal ang name sa room before mag add sa info
//change na lng ninyu ang cardId na dri na lng tanan 
// Probably error sa integration banda, start na lng mo dapit sa cardID since murag dli mn jud sya applicable kay wla mn ghpon sya na save sa database


    public function down()
    {
        Schema::dropIfExists('schedules');
    }
}
