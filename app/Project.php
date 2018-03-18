<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    public function companies(){
        return $this->belongsToMany('App\Company');
    }

    public function contacts(){
        return $this->belongsToMany('App\Contact');
    }
    public function status(){
        return $this->belongsTo('App\Status');
    }

    public function priority(){
        return $this->belongsTo('App\Priority');
    }

    public function currency(){
        return $this->belongsTo('App\Currency');
    }
}
