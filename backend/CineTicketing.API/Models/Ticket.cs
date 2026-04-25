namespace CineTicketing.API.Models;

public class Ticket {
    public int Id { get; set; }
    public int UserId { get; set; } // Simplificado para asociar la compra a un usuario
    public int ShowtimeId { get; set; }
    public int SeatId { get; set; }
    public DateTime PurchaseDate { get; set; }
    public string Status { get; set; } = "Reserved"; // Estados: Reserved, Purchased
}
