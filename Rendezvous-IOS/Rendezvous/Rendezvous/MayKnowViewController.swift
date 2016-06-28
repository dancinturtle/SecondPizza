//
//  LoginViewController.swift
//  Rendezvous
//
//  Created by Laura Wandres on 6/27/16.
//  Copyright © 2016 Laura Wandres. All rights reserved.
//

import UIKit

import Contacts
import ContactsUI

class MayKnowViewController: UIViewController, CNContactPickerDelegate, CNContactViewControllerDelegate {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
     
    }
    
    @IBAction func getContactsButtonPressed(sender: UIButton) {
       
        let picker = CNContactPickerViewController()
        picker.delegate = self
        
        // Display only a person's phone, email, and birthdate
        let displayedItems = [CNContactPhoneNumbersKey, CNContactEmailAddressesKey, CNContactBirthdayKey]
        picker.displayedPropertyKeys = displayedItems
        
        // Show the picker
        self.presentViewController(picker, animated: true, completion: nil)

    
        
         func showContactPickerController() {
            let picker = CNContactPickerViewController()
            picker.delegate = self
            
            // Display only a person's phone, email, and birthdate
            let displayedItems = [CNContactPhoneNumbersKey, CNContactEmailAddressesKey, CNContactBirthdayKey]
            picker.displayedPropertyKeys = displayedItems
            
            // Show the picker
            self.presentViewController(picker, animated: true, completion: nil)
        }
        
        //MARK: CNContactPickerDelegate methods
        // The selected person and property from the people picker.
        func contactPicker(picker: CNContactPickerViewController, didSelectContactProperty contactProperty: CNContactProperty) {
            let contact = contactProperty.contact
            let contactName = CNContactFormatter.stringFromContact(contact, style: .FullName) ?? ""
            let propertyName = CNContact.localizedStringForKey(contactProperty.key)
            let message = "Picked \(propertyName) for \(contactName)"
            
            dispatch_async(dispatch_get_main_queue()) {
                let alert = UIAlertController(title: "Picker Result",
                                              message: message,
                                              preferredStyle: .Alert)
                alert.addAction(UIAlertAction(title: "OK", style: .Default, handler: nil))
                self.presentViewController(alert, animated: true, completion: nil)
            }
        }
        
        // Implement this if you want to do additional work when the picker is cancelled by the user.
        func contactPickerDidCancel(picker: CNContactPickerViewController) {
            picker.dismissViewControllerAnimated(true, completion: {})
        }
        
        func contactViewController(viewController: CNContactViewController, shouldPerformDefaultActionForContactProperty property: CNContactProperty) -> Bool {
            return true
        }


    }
    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
}
