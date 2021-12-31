using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using sp.Entities;
using sp.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SportController : Controller
    {
        private readonly Context _context;
        public SportController(Context context)
        {
            _context = context;
        }


        [Route("CreateSportData")]
        [HttpPost]
        public async Task<ActionResult> CreateSportData([FromBody] object response)
        {
            try
            {
                JObject json = JObject.Parse(response.ToString());
                User user = await _context.Users.FindAsync(json["UserId"].ToString());
                Device device = await _context.Devices.FindAsync(json["DeviceId"].ToString());
                if (user == null || device == null)
                {

                    return Ok(new { status = 200, isSusses = false, message = "User not found" });
                }
                else
                {
                    _context.Sports.Add(new Sport
                    {
                        SportName = json["SportName"].ToString(),
                        SportTrace = json["SportTrace"].ToString(),
                        RunSpeed = Convert.ToDouble(json["RunSpeed"]),
                        Calories = Convert.ToDouble(json["Calories"]),
                        Heart = Convert.ToInt32(json["Heart"]),
                        RunDistance = Convert.ToDouble(json["RunDistance"]),
                        Device = device,
                        User = user
                    });
                    await _context.SaveChangesAsync();
                    return Ok(new { status = 200, isSusses = true, message = "加入運動成功" });
                }


            }
            catch
            {
                return Ok(new { status = 200, isSusses = false, message = "Register Error" });
            }
        }

        [Route("SportList/{UserId}")]
        [HttpGet]
        public async Task<ActionResult> SportList(int UserId)
        {
            User user =  _context.Users.Where(u => u.UserId == UserId).Include(u => u.Sports).FirstOrDefault();
            if (user != null)
            {
                return Ok(new { status = 200, isSusses = true, message = user.Sports.ToArray() });
            }
            else
            {
                return Ok(new { status = 200, isSusses = false, message = "Data not found" });
            }
        }

        [Route("Sport/{SportId}")]
        [HttpGet]
        public async Task<ActionResult<Sport>> Sport(int SportId)
        {
            var Sport = await _context.Sports.FindAsync(SportId);

            if (Sport == null)
            {
                return Ok(new { status = 200, isSusses = false, message = "Sport not found" });
            }

            return Ok(new { status = 200, isSusses = true, message = Sport });
        }
    }
}
