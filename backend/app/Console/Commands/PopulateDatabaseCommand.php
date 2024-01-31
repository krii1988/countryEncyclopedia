<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\File;
use App\Models\Country;

class PopulateDatabaseCommand extends Command
{
    protected $signature = 'db:populate';
    protected $description = 'Populate the database with data from an API';

    public function handle()
    {
        $response = Http::get('https://restcountries.com/v3.1/all');

        if ($response->successful()) {
            $countries = $response->json();
            $this->info('Populating from API...');
        } else {
            // If API call fails, fallback to local JSON file
            $this->warn('Failed to fetch data from the API. Falling back to local JSON file.');

            // Load data from local JSON file
            $jsonFile = storage_path('app/Data/countries.json');
            if (File::exists($jsonFile)) {
                $countries = json_decode(file_get_contents($jsonFile), true);
            } else {
                $this->error('Local JSON file not found.');
                return;
            }
        }

        // Sort countries by population in descending order
        usort($countries, function ($a, $b) {
            return $b['population'] <=> $a['population'];
        });

        // Assign population rank
        foreach ($countries as $key => $country) {
            $country['population_rank'] = $key + 1;

            // Assign languages
            $languages = [];
            if (isset($country['languages'])) {
                foreach ($country['languages'] as $code => $name) {
                    $languages[] = ['code' => $code, 'name' => $name];
                }
            }

            // Assign translations
            if (isset($country['translations'])) {
                $translations = [];
                foreach ($country['translations'] as $code => $name) {
                    $translations[] = ['code' => $code, 'official' => $name['official'], 'common' => $name['common']];
                }
                $country['translations'] = $translations;
            }

            $countryData = [
                'common_name' => $country['name']['common'],
                'official_name' => $country['name']['official'] ?? null,
                'country_code' => strtolower($country['cca3']) ?? null,
                'translations' => json_encode($translations ?? []),
                'population' => $country['population'] ?? null,
                'population_rank' => $country['population_rank'],
                'flag' => $country['flag'] ?? null,
                'area' => $country['area'] ?? null,
                'borders' => json_encode($country['borders'] ?? []),
                'languages' => json_encode($languages ?? [])
            ];

            Country::create($countryData);
        }

        $this->info('Database populated successfully!');
    }
}
