using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace sp.Entities
{
    public class Sport
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SportId { get; set; }
        public double Calories { get; set; }
        public int Heart { get; set; }
        public double RunDistance { get; set; }
        public double RunSpeed { get; set; }
        public string SportName { get; set; }
        public string SportTrace { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        [ForeignKey("DeviceId")]
        public Device Device { get; set; }
    }
}
