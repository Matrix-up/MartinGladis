using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using WebApp.Model;

namespace WebApp.Pages
{
    public class DescriptionModel : PageModel
    {
        public string description { get; set; } = "Nie wybrano żadnego miesca";
        public void OnGet()
        {
            if (DescripionPlace.opis != null) description = DescripionPlace.opis;
        }
    }
}