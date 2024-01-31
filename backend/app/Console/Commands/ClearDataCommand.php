<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Country;
use App\Models\Language;
use Illuminate\Database\DatabaseManager;

class ClearDataCommand extends Command
{
    protected $signature = 'db:clear';
    protected $description = 'Clear countries table';

    protected $db;

    public function __construct(DatabaseManager $db)
    {
        parent::__construct();
        $this->db = $db;
    }

    public function handle()
    {
        // Clear countries
        Country::truncate();

        $this->info('Data cleared successfully!');
    }
}
