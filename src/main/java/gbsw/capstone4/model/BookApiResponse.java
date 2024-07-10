package gbsw.capstone4.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookApiResponse {
    private String version;
    private String logo;
    private String title;
    private String link;
    private String pubDate;
    private int totalResults;
    private int startIndex;
    private int itemsPerPage;
    private String query;
    private int searchCategoryId;
    private String searchCategoryName;
    private List<Item> item;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Item {
        private String title;
        private String author;
        private String cover;
        private String isbn13;
        private SubInfo subInfo;

        @Getter
        @Setter
        @NoArgsConstructor
        @AllArgsConstructor
        public static class SubInfo {
            private Packing packing;

            @Getter
            @Setter
            @NoArgsConstructor
            @AllArgsConstructor
            public static class Packing {
                private double sizeDepth;
            }
        }
    }
}