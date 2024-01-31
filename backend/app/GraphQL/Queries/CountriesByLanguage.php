<?php

declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Models\Country;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

final class CountriesByLanguage
{
    public function __invoke($_, array $args, GraphQLContext $context)
    {
        $language = $args['language'];

        // Query the database to find countries with the specified language
        $countries = Country::where('languages', 'like', '%"' . $language . '"%')->get();

        return $countries;
    }
}
