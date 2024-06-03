<?php

namespace App\Http\Controllers;

use App\Models\Card;
use Illuminate\Http\Request;

class CardController extends Controller
{
    // Delete a card and its associated schedules
    public function destroy($id)
    {
        $card = Card::find($id);
        if ($card) {
            $card->delete(); // This will automatically delete associated schedules due to the cascading delete
            return response()->json(['message' => 'Card and associated schedules deleted'], 200);
        } else {
            return response()->json(['message' => 'Card not found'], 404);
        }
    }
}
