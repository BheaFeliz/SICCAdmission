<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateRegistrationForm extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Define valid choices for selectcourse
        $validChoices = ['bsab', 'bse', 'bpa', 'bstmt', 'bsc'];

        Schema::create('admission_forms', function (Blueprint $table) use ($validChoices) {
            $table->id();
            $table->string('fname');
            $table->string('lname');
            $table->string('mname')->nullable();
            $table->string('pref')->nullable();
            $table->integer('age')->nullable();
            $table->string('Monthoption')->nullable();
            $table->integer('date')->nullable();
            $table->integer('year')->nullable();
            $table->string('sex')->nullable();
            $table->string('gender')->nullable();
            $table->string('civilstatus')->nullable(); // Changed from civil_status
            $table->string('contactnumber', 11)->nullable();
            $table->string('email')->nullable();
            $table->string('pbirth')->nullable();
            $table->string('IndigentP')->nullable();
            $table->string('IndigentPy')->nullable();
            $table->string('pbs')->nullable();
            $table->string('district')->nullable();
            $table->string('barangay')->nullable();
            $table->string('cityM')->nullable();
            $table->string('province')->nullable();
            $table->integer('Zcode')->nullable();
            $table->string('familyB')->nullable();
            $table->string('sincewhen')->nullable();
            $table->string('Nsibling')->nullable();
            $table->string('supstudy')->nullable();
            $table->string('ofw')->nullable();
            $table->string('ofwProfession')->nullable();
            $table->string('studenttype')->nullable();
            $table->string('Nwork')->nullable();
            $table->string('StudentCat')->nullable();
            $table->string('F_nameSchool')->nullable();
            $table->string('F_Atrack')->nullable();
            $table->string('F_AMprovince')->nullable();
            $table->string('F_Ygrad')->nullable();
            $table->string('T_nameSchool')->nullable();
            $table->string('T_Atrack')->nullable();
            $table->string('T_AMprovince')->nullable();
            $table->string('T_Ygrad')->nullable();
            $table->string('selectcourse')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        // Add a check constraint to ensure selectcourse is one of the valid choices
        DB::statement("ALTER TABLE admission_forms ADD CONSTRAINT check_selectcourse CHECK (selectcourse IN ('" . implode("','", $validChoices) . "'))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admission_forms');
    }
};
