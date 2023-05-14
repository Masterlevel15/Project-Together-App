<?php

namespace App\Providers;

use Geocoder\Provider\Provider;
use Geocoder\Provider\Nominatim\Model\NominatimAddress;
use Geocoder\Exception\InvalidCredentialsException;
use Geocoder\Exception\QuotaExceededException;
use Geocoder\Exception\UnsupportedOperation;
use Geocoder\Query\GeocodeQuery;
use Geocoder\Query\ReverseQuery;

class CustomNominatim implements Provider
{
/**
     * @var Nominatim
     */
    protected $nominatim;

    /**
     * Constructor.
     *
     * @param string $userAgent
     * @param string $endpointUrl
     */
    public function __construct(string $userAgent, string $endpointUrl = 'https://nominatim.openstreetmap.org')
    {
        $this->nominatim = new Nominatim($userAgent, $endpointUrl);
    }

    /**
     * {@inheritdoc}
     */
    public function geocodeQuery(\Geocoder\Query\GeocodeQuery $query): \Geocoder\Model\AddressCollection
    {
        // Here you can add your custom logic to modify the query if needed.

        return $this->nominatim->geocodeQuery($query);
    }

    /**
     * {@inheritdoc}
     */
    public function reverseQuery(\Geocoder\Query\ReverseQuery $query): \Geocoder\Model\AddressCollection
    {
        // Here you can add your custom logic to modify the query if needed.

        return $this->nominatim->reverseQuery($query);
    }
    
    // Implement the getName() method as required by the Provider interface
    public function getName()
    {
        return 'custom_nominatim';
    }
}
