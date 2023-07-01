<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Rating;

class RatingController extends Controller
{
    //
    public function store(Request $request)
    {
        
        // Valider les données de la requête
        
        $request->validate([
            'rating' => 'required|numeric|min:1|max:5',
            'promoter_id' => 'required|exists:users,id',
            // Autres règles de validation si nécessaire
        ]);

        // Créer une nouvelle instance du modèle Rating
        $rating = new Rating();
        $rating->activity_id = $request->input('activity_id');
        $rating->rating = $request->input('rating');
        $rating->promoter_id = $request->input('promoter_id');
        
        // Ajouter d'autres champs si nécessaire

        // Sauvegarder le modèle dans la base de données
        $rating->save();

        // Calculer la moyenne du rating de l'organisateur
        if($rating) {
            $averageRating = Rating::where('promoter_id', $request->input('promoter_id'))
                ->avg('rating');
        }
        User::where('id', $request->input('promoter_id'))->update(['rate' => $averageRating]);

        // Répondre avec les données du modèle Rating ou un message de succès
        return response()->json(['message' => 'Note enregistrée avec succès', 'averageRating' => $averageRating], 201);
    }
}
