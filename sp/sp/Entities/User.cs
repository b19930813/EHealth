using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace sp.Entities
{
    public class User
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }

        public string Email { get; set; }   //帳號PK
        public string Password { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Sex { get; set; }

        public ICollection<Device> Devices { get; set; }
        public ICollection<Sport> Sports { get; set; }
    }
}
