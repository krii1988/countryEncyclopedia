<?php

declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Models\Country;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

final readonly class CountryByCode
{
    /** 
     * @param  mixed  $_
     * @param  array{}  $args 
     * @param  GraphQLContext  $context 
     * @return Country|null 
     */
    public function __invoke($_, array $args, GraphQLContext $context): ?Country
    {
        // Retrieve the country code from the arguments
        $country_code = $args['country_code'];

        // Fetch the country by its country code
        $country = Country::where('country_code', $country_code)->first();

        // Return the fetched country
        return $country;
    }
}
