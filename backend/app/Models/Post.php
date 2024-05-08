<?php

namespace App\Models;

use App\Models\Admin;
use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'content', 'author_id', 'category_id', 'slug', 'image', 'status', 'views_count','read_time','meta_desc'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function author()
    {
        return $this->belongsTo(Admin::class);
    }
}
