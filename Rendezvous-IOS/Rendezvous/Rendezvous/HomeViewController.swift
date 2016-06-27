//
//  HomeViewController.swift
//  Rendezvous
//
//  Created by Laura Wandres on 6/27/16.
//  Copyright © 2016 Laura Wandres. All rights reserved.
//

import UIKit
import MapKit
import CoreLocation

class HomeViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    @IBAction func PlanTripButtonPressed(sender: UIButton) {
        performSegueWithIdentifier("planTripSegue",sender: UIButton.self)
    }
    
    
    @IBAction func activityLogButtonPressed(sender: UIButton) {
        performSegueWithIdentifier("activityLogSegue",sender: UIButton.self)
        
    }
    
    
    @IBAction func settingsButtonPressed(sender: UIButton) {
        performSegueWithIdentifier("changeSettingsSegue",sender: UIButton.self)
        
    }
    
    
    @IBAction func manageVisibilityPressed(sender: UIButton) {
        performSegueWithIdentifier("manageVisibilitySegue",sender: UIButton.self)

        
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

