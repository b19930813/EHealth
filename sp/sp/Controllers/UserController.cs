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
    public class UserController : Controller
    {
        private readonly Context _context;
        public UserController(Context context)
        {
            _context = context;      
        }


        [Route("Register")]
        [HttpPost]
        public async Task<ActionResult> Regiest([FromBody] object response)
        {
            try
            {
                JObject json = JObject.Parse(response.ToString());
                int userCount = _context.Users.Count(u => u.Email == json["Email"].ToString());

                if (userCount == 0)
                {
                    User user = new User();
                    user.Email = json["Email"].ToString();
                    user.Password = json["Password"].ToString();
                    user.Name = json["Name"].ToString();
                    user.Phone = json["Phone"].ToString();
                    user.Sex = json["Sex"].ToString();
                    _context.Users.Add(user);

                    await _context.SaveChangesAsync();

                    _context.Devices.Add(new Device
                    {
                        BluetoothIdentifier = json["BluetoothIdentifier"].ToString(),
                        BluetoothName = json["BluetoothName"].ToString(),
                        BluetoothVersion = json["BluetoothVersion"].ToString(),
                        Device_Desc = json["Device_Desc"].ToString(),
                        Device_Type = json["Device_Type"].ToString(),
                        User = user,
                        UserId = user.UserId
                    });
                    await _context.SaveChangesAsync();
                    return Ok(new { status = 200, isSusses = true, message = "OK" });
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

                User FindUser = _context.Users.Where(u => u.Email == Email && u.Password == Password).Include(u => u.Devices).FirstOrDefault();
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
