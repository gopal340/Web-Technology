"""
Screen Recorder for Manual Testing
Records your screen while you manually test the application
The recording will be used to create automated Selenium tests
"""

import cv2
import numpy as np
import pyautogui
import datetime
import os
from threading import Thread
import time

class ScreenRecorder:
    def __init__(self, filename=None, fps=15):
        """Initialize screen recorder"""
        self.recording = False
        self.fps = fps
        
        # Create recordings directory
        self.recordings_dir = "recordings"
        os.makedirs(self.recordings_dir, exist_ok=True)
        
        # Generate filename with timestamp if not provided
        if filename is None:
            timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"manual_test_{timestamp}.avi"
        
        self.filename = os.path.join(self.recordings_dir, filename)
        
        # Get screen size
        self.screen_size = pyautogui.size()
        
        # Define codec and create VideoWriter
        fourcc = cv2.VideoWriter_fourcc(*'XVID')
        self.out = cv2.VideoWriter(
            self.filename,
            fourcc,
            self.fps,
            self.screen_size
        )
        
        print(f"\n{'='*80}")
        print(f"  Screen Recorder Initialized")
        print(f"{'='*80}")
        print(f"Output file: {self.filename}")
        print(f"Screen size: {self.screen_size}")
        print(f"FPS: {self.fps}")
        print(f"{'='*80}\n")
    
    def start_recording(self):
        """Start recording"""
        self.recording = True
        self.record_thread = Thread(target=self._record)
        self.record_thread.start()
        print("🔴 Recording started...")
        print("Press Ctrl+C in terminal to stop recording\n")
    
    def _record(self):
        """Internal recording loop"""
        while self.recording:
            # Capture screenshot
            img = pyautogui.screenshot()
            
            # Convert to numpy array
            frame = np.array(img)
            
            # Convert RGB to BGR (OpenCV uses BGR)
            frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)
            
            # Write frame
            self.out.write(frame)
            
            # Control frame rate
            time.sleep(1/self.fps)
    
    def stop_recording(self):
        """Stop recording"""
        self.recording = False
        if hasattr(self, 'record_thread'):
            self.record_thread.join()
        self.out.release()
        cv2.destroyAllWindows()
        
        print(f"\n{'='*80}")
        print(f"  Recording Stopped")
        print(f"{'='*80}")
        print(f"✅ Recording saved: {self.filename}")
        print(f"{'='*80}\n")


def record_student_test():
    """Record Student role testing"""
    print("\n" + "="*80)
    print("  RECORDING: STUDENT ROLE TESTING")
    print("="*80)
    print("\nInstructions:")
    print("1. This will start recording your screen")
    print("2. Open browser and navigate to http://localhost:5173/login")
    print("3. Log in with Google using: 01fe23bcs081@kletech.ac.in")
    print("4. Navigate through Student dashboard and features")
    print("5. Press Ctrl+C in this terminal when done")
    print("\n" + "="*80)
    
    input("\nPress ENTER to start recording Student role...")
    
    recorder = ScreenRecorder("student_manual_test.avi")
    recorder.start_recording()
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        recorder.stop_recording()
        print("\n✅ Student role recording complete!")


def record_faculty_test():
    """Record Faculty role testing"""
    print("\n" + "="*80)
    print("  RECORDING: FACULTY ROLE TESTING")
    print("="*80)
    print("\nInstructions:")
    print("1. This will start recording your screen")
    print("2. Log out and log in as Faculty")
    print("3. Navigate through Faculty dashboard and features")
    print("4. Press Ctrl+C in this terminal when done")
    print("\n" + "="*80)
    
    input("\nPress ENTER to start recording Faculty role...")
    
    recorder = ScreenRecorder("faculty_manual_test.avi")
    recorder.start_recording()
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        recorder.stop_recording()
        print("\n✅ Faculty role recording complete!")


def record_labinstructor_test():
    """Record Lab Instructor role testing"""
    print("\n" + "="*80)
    print("  RECORDING: LAB INSTRUCTOR ROLE TESTING")
    print("="*80)
    print("\nInstructions:")
    print("1. This will start recording your screen")
    print("2. Log out and log in as Lab Instructor")
    print("3. Navigate through Lab Instructor dashboard and features")
    print("4. Press Ctrl+C in this terminal when done")
    print("\n" + "="*80)
    
    input("\nPress ENTER to start recording Lab Instructor role...")
    
    recorder = ScreenRecorder("labinstructor_manual_test.avi")
    recorder.start_recording()
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        recorder.stop_recording()
        print("\n✅ Lab Instructor role recording complete!")


def main():
    """Main menu"""
    print("\n" + "="*80)
    print("  CEER SYSTEM - SCREEN RECORDER FOR MANUAL TESTING")
    print("="*80)
    print("\nThis tool will record your screen while you manually test.")
    print("The recordings will be used to create automated Selenium tests.\n")
    print("="*80)
    
    print("\nSelect role to record:")
    print("1. Student")
    print("2. Faculty")
    print("3. Lab Instructor")
    print("4. Record All (one by one)")
    print("5. Exit")
    
    choice = input("\nEnter choice (1-5): ").strip()
    
    if choice == "1":
        record_student_test()
    elif choice == "2":
        record_faculty_test()
    elif choice == "3":
        record_labinstructor_test()
    elif choice == "4":
        record_student_test()
        record_faculty_test()
        record_labinstructor_test()
        print("\n✅ All recordings complete!")
    elif choice == "5":
        print("\nExiting...")
        return
    else:
        print("\n❌ Invalid choice!")
        return
    
    print("\n" + "="*80)
    print("  RECORDINGS SAVED")
    print("="*80)
    print(f"\nLocation: {os.path.abspath('recordings')}")
    print("\nNext steps:")
    print("1. Review the recordings")
    print("2. Share what features you tested")
    print("3. I'll create automated tests based on your workflow")
    print("\n" + "="*80 + "\n")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nRecording interrupted by user")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("\nMake sure you have installed required packages:")
        print("pip install opencv-python pyautogui numpy")
