<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'store_id' => 'required|exists:stores,id',
            'category_label' => 'required|string',
            'job_order' => 'nullable|integer',
            'brand' => 'required|string',
            'model' => 'nullable|string',
            'part_model' => 'required|string',
            'downpayment' => 'required|numeric',
            'quantity' => 'required|integer',
            'status' => 'nullable|in:delivered,open,in-transit,cancelled,onhold',
            'link' => 'nullable|string',
            'notes' => 'nullable|string',
            'image_paths' => 'nullable|array',
            'image_paths.*' => 'nullable|string',
        ];
    }
}
