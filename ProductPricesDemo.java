import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class PriceProcessor {
    public static void main(String[] args) {
        // Initial list of product prices
        List<Double> prices = Arrays.asList(120.0, 45.0, 89.99, 45.0, 300.5, 120.0, 75.0);

        System.out.println("1. Original Prices:");
        prices.forEach(p -> System.out.print(p + "  "));

        // 2. Apply a 15% discount
        // Calculation: price * 0.85
        List<Double> discountedPrices = prices.stream()
                .map(price -> price * 0.85)
                .collect(Collectors.toList());

        System.out.println("\n\n2. Prices after 15% Discount:");
        discountedPrices.forEach(p -> System.out.printf("%.2f  ", p));

        // 3. Display Unique Prices (removes duplicates)
        System.out.println("\n\n3. Unique Prices:");
        prices.stream()
                .distinct()
                .forEach(p -> System.out.print(p + "  "));

        // 4. Sort Prices in Ascending Order
        System.out.println("\n\n4. Prices Sorted (Ascending):");
        prices.stream()
                .sorted()
                .forEach(p -> System.out.print(p + "  "));
    }
}