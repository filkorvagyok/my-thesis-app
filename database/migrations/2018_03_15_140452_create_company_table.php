<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompanyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('name')->unique();
            $table->string('logo')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('website')->nullable();
            $table->string('facebook')->nullable();
            $table->integer('taxnumber')->nullable();
            $table->json('headquarter')->nullable();
            $table->json('billing_address')->nullable();
            $table->json('mail_address')->nullable();
            $table->integer('industry_id')->unsigned()->nullable();
            $table->foreign('industry_id')->references('id')->on('industries');
            $table->integer('employeesnumber_id')->unsigned()->nullable();
            $table->foreign('employeesnumber_id')->references('id')->on('employeesnumbers');
            $table->integer('yearlyincome_id')->unsigned()->nullable();
            $table->foreign('yearlyincome_id')->references('id')->on('yearlyincomes');
        });

        /* Schema::table('companies', function (Blueprint $table) {
            $table->foreign('industry_id')->references('id')->on('industries');
        }); */
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('companies');
    }
}
