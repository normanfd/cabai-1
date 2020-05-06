<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePanensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('panen', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('pra_produksi_id');
            $table->integer('jumlah_panen');
            $table->timestamps();
            $table->foreign('pra_produksi_id')->references('id')->on('pra_produksi');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('panen');
    }
}
