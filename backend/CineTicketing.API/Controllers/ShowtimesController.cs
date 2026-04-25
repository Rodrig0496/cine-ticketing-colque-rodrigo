using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CineTicketing.API.Data;
using CineTicketing.API.Models;

namespace CineTicketing.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShowtimesController : ControllerBase {
    private readonly AppDbContext _context;

    public ShowtimesController(AppDbContext context) {
        _context = context;
    }

    // POST /api/showtimes — Registrar funcion de pelicula
    [HttpPost]
    public async Task<ActionResult<Showtime>> CreateShowtime(Showtime showtime) {
        _context.Showtimes.Add(showtime);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetShowtimeSeats), new { id = showtime.Id }, showtime);
    }

    // GET /api/showtimes?date={fecha}&time={hora} — Consultar funciones
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Showtime>>> GetShowtimes([FromQuery] DateTime date, [FromQuery] TimeSpan time) {
        return await _context.Showtimes
            .Where(s => s.StartTime.Date == date.Date && s.StartTime.TimeOfDay == time)
            .ToListAsync();
    }

    // GET /api/showtimes/{id}/seats — Ver disponibilidad de asientos
    [HttpGet("{id}/seats")]
    public async Task<ActionResult<IEnumerable<Seat>>> GetShowtimeSeats(int id) {
        var showtime = await _context.Showtimes.FindAsync(id);
        if (showtime == null) return NotFound("Función no encontrada");
        
        return await _context.Seats.Where(s => s.RoomId == showtime.RoomId).ToListAsync();
    }
}
