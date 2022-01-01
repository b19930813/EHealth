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
    public class DeviceController : Controller
    {

        private readonly Context _context;
        public DeviceController(Context context)
        {
            _context = context;
        }


        [Route("CreateDevice")]
        [HttpPost]
        public async Task<ActionResult> CreateDevice([FromBody] object response)
        {
            try
            {
                JObject json = JObject.Parse(response.ToString());
                User user = await _context.Users.FindAsync(json["UserId"].ToString());
                if (user == null)
                {

                    return Ok(new { status = 200, isSusses = false, message = "User not found" });
                }
                else
                {
                    _context.Devices.Add(new Device
                    {
                       BluetoothIdentifier = json["BluetoothIdentifier"].ToString(),
                       BluetoothName = json["BluetoothName"].ToString(),
                       BluetoothVersion = json["BluetoothVersion"].ToString(),
                       Device_Desc = json["Device_Desc"].ToString(),
                       Device_Type = json["Device_Type"].ToString(),
                       User = user,

                    });
                    await _context.SaveChangesAsync();
                    return Ok(new { status = 200, isSusses = true, message = "加入Device成功" });
                }
            }
            catch
            {
                return Ok(new { status = 200, isSusses = false, message = "Register Error" });
            }
        }
    }
}
