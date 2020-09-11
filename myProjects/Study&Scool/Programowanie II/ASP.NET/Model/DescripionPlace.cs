using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Model
{
    public static class DescripionPlace
    {
        public static string nazwa { get; set; }
        public static string opis { get; set; }
        public static string kraj { get; set; }
        public static string miasto { get; set; }
        public static bool state { get; set; } = false;
        public static int id { get; set; }
    }
}
