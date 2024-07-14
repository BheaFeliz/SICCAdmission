<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::table('registrations', function (Blueprint $table) {
            if (!Schema::hasColumn('registrations', 'reference_number')) {
                $table->string('reference_number')->nullable()->after('id');
            } else {
                $table->string('reference_number')->nullable(false)->change();
            }
        });
    }

    public function down() {
        Schema::table('registrations', function (Blueprint $table) {
            $table->string('reference_number')->nullable()->change();
        });
    }
};
