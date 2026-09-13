import java.util.Scanner;

public class Quiz {
    public static void main(String[] args) {
        String name;
        Scanner myobj = new Scanner(System.in);
        System.out.println("Enter your name");
        name = myobj.nextLine();
        System.out.println("Hello , " + name + "!");
    }
}
