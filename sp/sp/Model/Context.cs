using Microsoft.EntityFrameworkCore;
using sp.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sp.Model
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options)
        : base(options)
        {


        }
        public DbSet<User> Users { get; set; }
        public DbSet<Device> Devices { get; set; }
        public DbSet<Sport> Sports { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {    
            modelBuilder.Entity<User>()
                .HasMany(u => u.Devices)
                .WithOne(o => o.User)
                .HasForeignKey(u => u.DeviceId);

            modelBuilder.Entity<User>()
                 .HasMany(u => u.Sports)
                 .WithOne(o => o.User)
                 .HasForeignKey(u => u.SportId);
        }
    }
}
