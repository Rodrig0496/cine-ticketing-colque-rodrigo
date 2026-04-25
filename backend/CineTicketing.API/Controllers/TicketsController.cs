using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CineTicketing.API.Data;
using CineTicketing.API.Models;

namespace CineTicketing.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TicketsController : ControllerBase {
    private readonly AppDbContext _context;

    public TicketsController(AppDbContext context) {
        _context = context;
    }

    // POST /api/tickets/reservations — Reservar asientos temporalmente
    [HttpPost("reservations")]
    public async Task<IActionResult> ReserveSeat([FromBody] Ticket request) {
        var seat = await _context.Seats.FindAsync(request.SeatId);
        if (seat == null || !seat.IsAvailable) return BadRequest("El asiento no existe o ya está ocupado");

        seat.IsAvailable = false; // Bloqueo temporal del asiento
        request.Status = "Reserved";
        request.PurchaseDate = DateTime.UtcNow;
        
        _context.Tickets.Add(request);
        await _context.SaveChangesAsync();
        
        return Ok(request);
    }

    // POST /api/tickets/purchase — Confirmar compra de boletos
    [HttpPost("purchase")]
    public async Task<IActionResult> PurchaseTicket([FromBody] int ticketId) {
        var ticket = await _context.Tickets.FindAsync(ticketId);
        if (ticket == null || ticket.Status != "Reserved") return BadRequest("Reserva inválida o expirada");

        ticket.Status = "Purchased";
        await _context.SaveChangesAsync();
        
        return Ok(new { Message = "Compra confirmada exitosamente", TicketId = ticket.Id });
    }
}
