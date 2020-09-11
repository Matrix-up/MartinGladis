using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Model
{
    public class EmpClass
    {
        [Key]
        public int id_miejsca { get; set; }
        public string nazwa { get; set; }
        public string opis { get; set; }
        public string kraj { get; set; }
        public string miasto { get; set; }
        public byte[] zdjecie { get; set; }
    }
}
