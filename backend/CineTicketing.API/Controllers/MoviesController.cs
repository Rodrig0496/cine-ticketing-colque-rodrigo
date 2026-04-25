using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CineTicketing.API.Data;
using CineTicketing.API.Models;

namespace CineTicketing.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase {
    private readonly AppDbContext _context;

    public MoviesController(AppDbContext context) {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Movie>>> GetMovies() {
        return await _context.Movies.ToListAsync();
    }
}
