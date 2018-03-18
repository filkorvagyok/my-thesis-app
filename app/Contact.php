<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    public function companies(){
        return $this->belongsToMany('App\Company');
    }

    public function projects(){
        return $this->belongsToMany('App\Project');
    }
}
