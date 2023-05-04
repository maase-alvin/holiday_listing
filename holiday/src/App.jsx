import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import OfferTile from "./OfferTile.js";
import { GET_OFFERS, MARK_VISITED } from "./queries.js";

export default function HolidayOffers() {
const { loading, error, data } = useQuery(GET_OFFERS, {
variables: { limit: 10, sort: { by: "DATE_ADDED", order: "DESC" } },
});

const [markVisited] = useMutation(MARK_VISITED, {
update(cache, { data: { markedVisited } }) {
const { offers } = cache.readQuery({ query: GET_OFFERS });
const updatedOffers = offers.map((offer) => {
if (offer.id === markedVisited.id) {
return { ...offer, visitedCount: markedVisited.visitedCount };
}
return offer;
});
cache.writeQuery({
query: GET_OFFERS,
data: { offers: updatedOffers },
});
},
});

const handleVisit = (offerId) => {
markVisited({ variables: { offerId } });
};

if (loading) return <div>Loading offers...</div>;
if (error) return <div>Failed to load offers</div>;

return (
<div>
{data.offers.map((offer) => (
<OfferTile
key={offer.id}
name={offer.name}
visitedCount={offer.visitedCount}
price={${offer.value} ${offer.currency}}
imageUrl={offer.imageUrl}
description={offer.description || ""}
clickHandler={() => handleVisit(offer.id)}
/>
))}
</div>
);
}

// queries.js
import { gql } from "@apollo/client";

export const GET_OFFERS = gql query GetOffers($limit: Int, $sort: Sort) { offers(limit: $limit, sort: $sort) { id name imageUrl dateAdded description value currency visitedCount } };

export const MARK_VISITED = gql mutation MarkVisited($offerId: String!) { markedVisited(offerId: $offerId) { id visitedCount } };