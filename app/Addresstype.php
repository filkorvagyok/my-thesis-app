<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Addresstype extends Model
{
    public $timestamps = false;

    public function address(){
        return $this->belongsTo('App\Address');
    }
}
