using Microsoft.AspNetCore.Mvc;
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
    public class UserController : Controller
    {
        private readonly Context _context;
        public UserController(Context context)
        {
            _context = context;      
        }


        [Route("Register")]
        [HttpPost]
        public async Task<ActionResult> Regiest(User user)
        {
            try
            {
                int userCount = _context.Users.Count(u => u.Email == user.Email);
                if (userCount == 0)
                {
                    _context.Users.Add(user);

                    await _context.SaveChangesAsync();
                    return Ok(new { status = 200, isSusses = true, message = $"Register User {user.Name} Success" });
                }
                else
                {
                    return Ok(new { status = 200, isSusses = false, message = "User is exist" });
                }

            }
            catch
            {
                return Ok(new { status = 200, isSusses = false, message = "Register Error" });
            }
        }

        [Route("Login")]
        [HttpPost]
        public async Task<ActionResult> Login([FromBody] object response)
        {
            try
            {
                JObject json = JObject.Parse(response.ToString());
                string Email = json["Email"].ToString();
                string Password = json["Password"].ToString();

                User FindUser = _context.Users.Where(u => u.Email == Email && u.Password == Password).FirstOrDefault();
                if(FindUser != null)
                {
                    return Ok(new { status = 200, isSusses = true, message = FindUser.UserId  });
                }
                else
                {
                    return Ok(new { status = 200, isSusses = false, message = "使用者不存在" });
                }
            }
            catch
            {
                return Ok(new { status = 200, isSusses = false, message = "登入錯誤" });
            }

        }
    }
}
