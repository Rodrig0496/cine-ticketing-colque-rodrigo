using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CineTicketing.API.Data;
using CineTicketing.API.Models;

namespace CineTicketing.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase {
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context) {
        _context = context;
    }

    // GET /api/users/{id}/tickets — Ver boletos comprados por usuario
    [HttpGet("{id}/tickets")]
    public async Task<IActionResult> GetUserTickets(int id) {
        var tickets = await _context.Tickets
            .Where(t => t.UserId == id && t.Status == "Purchased")
            .ToListAsync();
            
        return Ok(tickets);
    }
}
