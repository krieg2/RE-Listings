package com.example.springboot;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.springboot.dto.ListingDto;
import com.example.springboot.service.ListingService;

@SpringBootTest
@AutoConfigureMockMvc
public class ListingServiceTest {
    @Autowired
    private ListingService listingService;

    @Test
    @DisplayName("Should return all of the listings from the json")
    void parseListingsJson_Success() {
        List<ListingDto> result = listingService.parseListingsJson();

        assertThat(result).isNotNull();
        assertThat(result.size()).isEqualTo(12);
    }

    @Test
    @DisplayName("Should calculate scores for listings")
    void scoreListings_Success() {
        List<ListingDto> listings = listingService.parseListingsJson();

        listingService.scoreListings(500000, listings);

        assertThat(listings).isNotNull();
        assertThat(listings.size()).isEqualTo(12);
    }

    @Test
    @DisplayName("Should calculate score matching specific listings with targetBudget=525,000")
    void scoreListings525k_Success() {
        List<ListingDto> listings = listingService.parseListingsJson();

        listingService.scoreListings(525000, listings);

        assertThat(listings).isNotNull();
        assertThat(listings.size()).isEqualTo(12);
        assertThat(listings.get(2).score).isEqualTo(100);
        //assertThat(listings.get(4).score).isEqualTo(0);
        assertThat(listings.get(10).score).isEqualTo(72);
    }

    @Test
    @DisplayName("Should calculate score matching specific listings with targetBudget=10,000")
    void scoreListings10k_Success() {
        List<ListingDto> listings = listingService.parseListingsJson();

        listingService.scoreListings(10000, listings);

        assertThat(listings).isNotNull();
        assertThat(listings.size()).isEqualTo(12);
        assertThat(listings.get(11).score).isEqualTo(0);
    }
}
