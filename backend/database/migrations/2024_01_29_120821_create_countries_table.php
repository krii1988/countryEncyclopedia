<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCountriesTable extends Migration
{
    public function up()
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->text('common_name');
            $table->text('official_name')->nullable();
            $table->text('country_code')->nullable();
            $table->json('translations')->nullable();
            $table->integer('population')->nullable();
            $table->integer('population_rank')->nullable();
            $table->text('flag')->nullable();
            $table->float('area')->nullable();
            $table->json('borders')->nullable();
            $table->json('languages')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('countries');
    }
}
